//@ts-ignore
const { jsPDF } = window.jspdf;

// Funzione per creare un PDF
export function creaPDF(): void {
  // Crea un nuovo documento PDF
  const doc = new jsPDF();

  // Aggiungi testo al documento
  doc.text("Hello World!", 10, 10);

  // Salva il documento come file PDF
  doc.save("example.pdf");
}