let jsPDF = require('jspdf');

export async function creaPdf(){

    console.log("start")
    var doc = new jsPDF.jsPDF()

    doc.text('Hello world!', 10, 10)
    doc.save('a4.pdf')
    console.log("end")
}