(function() {
	var Config = function () {

		/**
		 * 测试模式
		 * 开启后获取用户只有一个测试用户登陆，发送私信的任务只有高晨的一个，发送私信不会保存到后台数据库。
		 */
		this.debug = false;
	};

	$config = new Config();

})();
