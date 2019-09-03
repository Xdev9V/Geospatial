function getValues()
{
    var ocr= cognos.Report.getReport("_THIS_");
   
    oTreeAvailability=  ocr.prompt.getControlByName('Test2');    
    
};
