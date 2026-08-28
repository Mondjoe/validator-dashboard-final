import React from "react";
import { useState, useEffect } from "react";

interface ManusDialogProps {
  title?: string;
  description?: string;
  logo?: string;
  open?: boolean;          // ← ADD THIS
  onLogin?: () => void;    // ← You are destructuring this too
  onOpenChange?: (v: boolean) => void;  // ← You are destructuring this too
  onClose?: () => void;    // ← You are destructuring this too
  children?: React.ReactNode;
}

export function ManusDialog({
  title,
  logo,
  open = false,
  onLogin,
  onOpenChange,
  onClose,
}: ManusDialogProps) {
  const [internalOpen, setInternalOpen] = useState(open);

  useEffect(() => {
    if (!onOpenChange) {
      setInternalOpen(open);
    }
  }, [open, onOpenChange]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(nextOpen);
    } else {
      setInternalOpen(nextOpen);
    }

    if (!nextOpen) {
      onClose?.();
    }
  };

 return internalOpen ? (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
    <div className="bg-[#f8f8f7] rounded-[20px] w-[400px] shadow-[0px_4px_11px_0px_rgba(0,0,0,0.08)] border border-[rgba(0,0,0,0.08)] p-6 text-center">
      
      {logo && (
        <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-xl border border-[rgba(0,0,0,0.08)] flex items-center justify-center">
          <img src={logo} alt="Dialog graphic" className="w-10 h-10 rounded-md" />
        </div>
      )}

      {title && (
        <h2 className="text-xl font-semibold text-[#34322d] leading-[26px] tracking-[-0.44px] mb-2">
          {title}
        </h2>
      )}

      <p className="text-sm text-[#858481] leading-5 tracking-[-0.154px] mb-6">
        Please login with Manus to continue
      </p>

      <button
        onClick={onLogin}
        className="w-full h-10 bg-[#1a1a19] hover:bg-[#1a1a19]/90 text-white rounded-[10px] text-sm font-medium leading-5 tracking-[-0.154px]"
      >
        Login with Manus
      </button>
    </div>
  </div>
) : null;
}
