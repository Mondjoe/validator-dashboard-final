export function importIdentitySnapshot(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        resolve(json.identity);
      } catch (err) {
        reject("Invalid identity snapshot file");
      }
    };

    reader.onerror = () => reject("Failed to read file");

    reader.readAsText(file);
  });
}
