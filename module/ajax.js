(function() {

	var $this;

	var Ajax = function() {

		// 接口主机地址
		this.api_host = 'h5.romic.meimi.me';

		// 初始化
		this.init = function() {
			$this = this;
			return $this;
		};
		
	};

	$ajax = new Ajax();
	$ajax.init();

})();
