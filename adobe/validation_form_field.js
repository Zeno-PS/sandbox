//A client may ask us to build a PDF form for them, for Laserfiche Workflow to fill out or read from. 
//When building the form in Adobe Acrobat Pro, you can use JavaScript to validate fields.
//Below is an example, which requires the field's text to be a value of either `AAAA` or `BBBB`.
//For more info, see: http://khkonsulting.com/2012/11/validating-field-contents/

event.rc = true;
if (event.value != "AAAA" && event.value != "BBBB")
{
    app.alert("The entered value needs to be either 'AAAA' or 'BBBB'!");
    event.rc = false;
}
