// javascript和C一樣使用//表示單行註解，使用/* */表示多行註解
// 載入express模組 
var express = require('express');
/* 使用express.Router類別來建立可裝載的模組路由的物件
   路由是指應用程式端點 (URI) 的定義，以及應用程式如何回應用戶端的要求。*/
var router = express.Router();

// 取得Server端的ip，請記得在專案中安裝underscore模組: npm install underscore
var sip = require('underscore')
    .chain(require('os').networkInterfaces())
    .values()
    .flatten()
    .find({family: 'IPv4', internal: false})
    .value()
    .address;
console.log('Server IP='+sip);

//**************************************************************************
//************ 根據Client端送來之請求命令顯示相對應網頁之方法 ************
//**************************************************************************
// 建立(附加)一個客戶端對應用程式提出 GET / 方法時的路由處理方法(匿名式函數)
// 比照此方式，你可以建立其他GET不同路徑的路由處理方法
// 顯示首頁
router.get('/', function(req, res) {
	res.render('index');
});

// 顯示資料收集與查詢服務操作介面
router.get('/data_collection', function(req, res) {
	res.render('data-collection');
});

//*************************************************************************************
//**** 讀取DHT11溫、溼度，然後儲存於mySQL資料庫，並且取出與回傳資料庫最近10筆紀錄 *****
//*************************************************************************************
// 建立(附加)一個客戶端對應用程式提出 POST /data_collection方法時的路由處理方法(匿名式函數)
// 比照此方式，你可以建立其他POST不同路徑的路由處理方法
router.post('/save_retrieve_thdata', function(req, res){
	// 引用設計的資料庫存取函數模組
	var mysqlfuns = require('./mysqlfuns.js');
		
	// 利用亂數產生模擬之溫、溼度資料
	var d = new Date();
	var temp = (25.0 + Math.random()*2).toFixed(1);  
	var humid = (60.0 + Math.random()*5).toFixed(1);
	console.log("Temperature: ", temp); // Here, just print the result.
	console.log("Humidity: ", humid);   // Here, just print the result.
	// 將產生之溫、濕度及日期存入資料庫中
	mysqlfuns.savedata(d, temp, humid, showstatus);
	
	// 從資料取出最新之10筆資料，並回傳給前端介面
	mysqlfuns.querydata(10, getresult);

	// 顯示訊息之callback function1
	function showstatus(message)
	{
		console.log(message.dbstatus);
	}

	// 顯示訊息之callback function2
	function getresult(message)
	{
		console.log(message.dbstatus);
		qdata = message.result;
		res.send(qdata);
	}
			
});

module.exports = router;
