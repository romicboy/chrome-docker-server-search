(function() {

	var $this;

	var Content = function() {

		this.dockerServerMap = null;

		this.search = function() {
			var input = $('#docker-search .search-input input');
			input.on('keyup paste', function () {
				var keyword = $(this).val();
				result = $this.getSearchResult(keyword);
				$this.showResult(result);
			});
			$(window).keyup(function(e){
				if(e.keyCode == 27){
					$this.showResult(null);
					input.val('');
					$('#docker-search .search-input input').blur();
				}
	   　　　});
		};

		this.checkInput = function() {
			var searchDom = $('#docker-search');
			$('#docker-search .search-input input').on('focus', function () {
				searchDom.css('opacity',1);
			});
			$('#docker-search .search-input input').on('blur', function () {
				searchDom.css('opacity',0.4);
			});
		}

		this.getSearchResult = function(keyword) {
			var resultBox = $('#docker-search .search-result');
			if (keyword == '') {
				resultBox.hide();
				return null;
			}
			var result = null;
			$.each($this.dockerServerMap, function(key, val){
				if ($this.isContains(key, keyword)) {
					if (null == result) result = {};
					result[key] = val;
				}
			});
			return result;
		};

		this.showResult = function(result) {
			var resultBox = $('#docker-search .search-result');
			if (null == result) {
				resultBox.hide();
				return;
			}

			var ul = $('#docker-search .search-result ul');
			ul.html('');
			$.each(result, function(key, val){
				ul.append("<li><span class='c-purple'>"+key + "<span>  : <span class='c-red'>[ " + val+" ]</span></li>");
			});
			resultBox.show();
		};

		this.getServerList = function() {
			var text = $('body').text();
			var array = text.split("\n");

			var list = [];
			for(var i=1;i<array.length;i++){
				var item = array[i];
				if ('' != item && ' ' != item) {
					list.push(item);
				}
			}

			// var serverNameList = $this.getServerNameList(list);
			// console.log(serverNameList);

			// var dockerNameList = $this.getDockerNameList(list);
			// console.log(dockerNameList);

			// var dockerServerMap = $this.getDockerServerList(list);
			// console.log(dockerServerMap);

			$this.dockerServerMap = dockerServerMap = $this.getDockerServerList(list);
		};

		this.getDockerServerList = function(list) {
			var serverName = null;
			var dockerServerMap = {};
			for(var i=1;i<list.length;i++){
				var item = list[i];

				if ($this.isServer(item)) {
					serverName = $this.getServerName(item);
				}

				if ($this.isDocker(item)) {

					if (dockerServerMap[$this.getDockerName(item)] == undefined) {
						dockerServerMap[$this.getDockerName(item)] = [];
					}

					dockerServerMap[$this.getDockerName(item)].push(serverName);
				}
			}
			return dockerServerMap;
		};

		this.getDockerNameList = function(list) {
			var dockerNameList = [];
			for(var i=1;i<list.length;i++){
				var item = list[i];
				if ($this.isDocker(item)) {
					dockerNameList.push($this.getDockerName(item));
				}
			}
			return dockerNameList;
		};

		this.getServerNameList = function(list) {
			var serverNameList = [];
			for(var i=1;i<list.length;i++){
				var item = list[i];
				if ($this.isServer(item)) {
					serverNameList.push($this.getServerName(item));
				}
			}
			return serverNameList;
		};

		this.getServerName = function(str) {
			return str.split(" ")[0];
		};

		this.getDockerName = function(str) {
			var arr = str.split(" ");
			return arr[arr.length-1];
		};

		this.isDocker = function(str) {
			return (!$this.isServer(str) && !$this.isTitle(str)) ? true : false;
		};

		this.isTitle = function(str) {
			return $this.isContains(str, 'CONTAINER');
		};

		this.isServer = function(str) {
			return $this.isContains(str, '>>');
		};

		this.isContains = function(str, substr) {
    		return str.indexOf(substr) >= 0;
		};

		this.bindEvent = function() {
			if ($this.isContains(location.href,'http://www.test.care001.cn/docker.txt')) {
				$this.appendHtml();
				$this.search();
				$this.checkInput();
				$common.notify('点滴关怀','强大的搜索功能已经ready。。。');
				$this.getServerList();
			}
		};

		this.appendHtml = function () {
			$('head').append('<style type="text/css">#docker-search{opacity: 0.5;position:fixed;top:50px;left:50px;float:left}#docker-search .search-input input{padding:8px;width:300px;height:40px;font-size:1pc}#docker-search .search-result{float:left;margin-top:10px;padding:8px 9pt;min-width:294px;border:1px solid #ccc;background: white;display: none;}#docker-search .search-result ul{margin:0;padding:0;list-style-type:none;text-align:left}.clear{clear:both}.c-red{color: red;}.c-purple{color: purple;}</style>');
			$('body').append('<div id="docker-search"><div class="search-input"><input type="text" name="key" value=""></div><div class="search-result"><ul><li>api-app-test : ["t6-10.47.61.213"]</li><li>api-app-test : ["t6-10.47.61.213"]</li></ul></div><div class="clear"></div></div>');
		}

		this.init = function() {
			$this = this;
			this.bindEvent();
			return this;
		};
	};

	$(function() {
		setTimeout(function() {
			var content = new Content();
			content.init();
		}, 1000);

		$('body').dblclick(function() {
			console.log('body dblclick');
		});
	});

})();
