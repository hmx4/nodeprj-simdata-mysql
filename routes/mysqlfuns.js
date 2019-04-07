module.exports.savedata = savedata;
module.exports.querydata = querydata;
module.exports.deletedata = deletedata;

//======== 儲存一筆溫度、濕度資料之函數 ===========================================================
function savedata(date, temp, humid, cb)
{
	// 引用mysql模組
	var mysql = require('mysql');
	// 建立資料庫之連接物件
	var connection = mysql.createConnection({
		host : '127.0.0.1',
		port : 3306,
		user : 'root',
		password : '123456',
		database : 'mydb1'
	});

	// 建立擬儲存資料之JSON物件
	var data = {timestamp: date, temperature: temp, humidity: humid};
	// 執行資料儲存
	connection.query('INSERT INTO dhtsensor SET ?', data, function(err, result){
		if(err) 
			message = {'dbstatus': 'Error in saving data!', 'result': err};
		else
			message = {'dbstatus': 'A record is inserted!', 'result': result};
		cb(message);
	});
	
    // end the connection to db
	connection.end();
}

//======== 查詢最新的1筆溫度、濕度資料之函數 =====================================================
function querydata(n, cb)
{
	// 引用mysql模組
	var mysql = require('mysql');
	// 建立資料庫之連接物件
	var connection = mysql.createConnection({
		host : '127.0.0.1',
		port : 3306,
		user : 'root',
		password : '123456',
		database : 'mydb1'
	});

	// 執行資料查詢
	connection.query('SELECT * FROM dhtsensor order by id desc limit ?', [n], function(err, result){
		if(err) 
			message = {'dbstatus': 'Error in saving data!', 'result': err};
		else
		{
			n = result.length;
			message = {'dbstatus': n +' records are retrieved!', 'result': result};
		}
		cb(message);
	});
	
    // end the connection to db
	connection.end();
}

//======== 刪除最舊的1筆溫度、濕度資料之函數 =======================================================
function deletedata(n, cb)
{
	// 引用mysql模組
	var mysql = require('mysql');
	// 建立資料庫之連接物件
	var connection = mysql.createConnection({
		host : '127.0.0.1',
		port : 3306,
		user : 'root',
		password : '123456',
		database : 'mydb1'
	});
	
	// 執行資料刪除
	connection.query('DELETE FROM dhtsensor order by id asc limit ?', [n], function(err, result){
		if(err) 
			message = {'dbstatus': 'Error in deleting data!', 'result': err};
		else
			message = {'dbstatus': n + ' records are deleted!', 'result': result};
		cb(message);
	});
	
    // end the connection to db
	connection.end();
}
