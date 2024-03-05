import * as jspdf from '../../../node_modules/jspdf';

export function creaPdf(){
    console.log("start")
    var doc = new jspdf.jsPDF()

    doc.text('Hello world!', 10, 10)
    doc.save('a4.pdf')
    console.log("end")
}
