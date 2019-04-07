// 引用同一目錄下之mysqlfuns.js (提供儲存資料、查詢資料及刪除資料等3個函數)
var mysqlfuns = require('./mysqlfuns.js');

//==== 儲存資料2筆測試  ======================
// 用亂數產生第1筆資料並儲存
var d = new Date();
console.log(d);
var temp = (25.0 + Math.random()*2).toFixed(1);  
var humid = (60.0 + Math.random()*5).toFixed(1);
mysqlfuns.savedata(d, temp, humid, showstatus);
// 用亂數產生第2筆資料並儲存
var d = new Date();
console.log(d);
var temp = (25.0 + Math.random()*2).toFixed(1);  
var humid = (60.0 + Math.random()*5).toFixed(1);
mysqlfuns.savedata(d, temp, humid, showstatus);

//==== 查詢最新的5筆資料並顯示 ================
n=5;
mysqlfuns.querydata(n, displayresult);

//==== 刪除最舊的1筆資料並顯示  ===============
n=1;
mysqlfuns.deletedata(n, showstatus);

//====== 顯示新增資料及刪除資料操作之結果的回呼函數 ========
function showstatus(message)
{
	console.log(message.dbstatus);
	console.log(message.result);
}

//====== 顯示查詢資料之結果的回呼函數 ======================
function displayresult(message)
{
	console.log(message.dbstatus);
	qdata = message.result;
	for(i=0; i<qdata.length; i++)
	{
		console.log(qdata[i]['timestamp'].toLocaleString());
		console.log(qdata[i]['temperature']);
		console.log(qdata[i]['humidity']);
	}
		
}

