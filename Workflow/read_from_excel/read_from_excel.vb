'Use a "SDK Script" to do the following:
'
'- Get a Laserfiche document's electronic file, where this file is an .xlsx file.
'- Export it to the Workflow Server machine (e.g., "C:\Laserfiche Workflow Generated Files")
'- Use Excel's API to read the contents of the exported .xlsx file and return those values to the workflow.
'- Creates tokens for each returned Excel cell value.
'- Deletes the exported .xlsx file.

'Important: In order for the Workflow Serve to interface with an Excel file, a few things have to be set up:
'
'1: See here: http://stackoverflow.com/questions/14037412/cannot-access-excel-file/16236873#16236873 These folders must be created.
'2: Ensure that the Workflow Server service has "Allow service to interact with desktop" selected. This is configured in Windows' Services window.

'Export the Excel file.
Dim MySession As Session = me.RASession
Dim MyDocument As Laserfiche.RepositoryAccess.DocumentInfo
Dim ExportDoc As New DocumentExporter
Dim EntryID as Integer = me.BoundEntryId
MyDocument = Document.GetDocumentInfo(EntryID, MySession)
Dim ExportPath as String = "C:\Laserfiche Workflow Generated Files\" & me.BoundEntryInfo.Name & ".xlsx" '<-- TODO: This naming logic sucks, and is very susceptible to collisions. This should be improved.
ExportDoc.ExportElecDoc(MyDocument, ExportPath)

Dim APP As New Microsoft.Office.Interop.Excel.Application
APP.DisplayAlerts = False '<-- Prevents Excel from trying to throw UI windows to the screen, which could cause problems for Workflow.
Dim worksheet As Microsoft.Office.Interop.Excel.Worksheet
Dim workbook As Microsoft.Office.Interop.Excel.Workbook

workbook = APP.Workbooks.Open(ExportPath)
worksheet = workbook.Worksheets("Sheet1")

Dim ExcelVal As String = worksheet.Cells(1, 1).Value

App.Quit ' <-- Very important, otherwise Workflow leaves the file open in memory, which causes problems with deleting the file and/or when the workflow needs to run on a different .xlsx file in the future.

Me.SetToken("ExcelVal", ExcelVal)

System.IO.File.Delete(ExportPath)