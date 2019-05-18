class Send {
	constructor(seletor) {
	    // 获取元素
		this.btn = document.querySelector(seletor); 
		this.box =  document.querySelector("#box");
		this.ul = document.createElement("ul");
		this.del = this.ul.querySelector(".del");
		this.time = 0; // 记录时间戳
		this.div = document.createElement("div"); // 创建div放置微博内容
		this.bindEvents(); // 调用绑定时间
	}
	// 绑定函数
	bindEvents() {
		this.btn.onclick = function () {
			this.BoxBtn();
		}.bind(this);
		// 删除和登录按钮事件委托给box
		this.box.onclick = e => {
			switch(e.target.id) {
				case "sendBtn": this.sendBtnClick(); break;
				case "closeBtn": this.closeBtnClick(); break;
			}
		}	
	}
	BoxBtn(){
		this.box.innerHTML = '<h4>发布</h4><a id="closeBtn" href="javascript:;">×</a><p><label>用户名：<input id="username" type="text"></label></p><p><label>内容：<textarea></textarea></label></p><p><button id="sendBtn" type="button">发布</button></p>';
		tools.showCenter(this.box);
		this.modal = document.createElement("div");
		this.modal.className = "modal";
		document.body.appendChild(this.modal);
	}
	closeBtnClick(){
		this.box.style.display = "none";
		document.body.removeChild(this.modal);
	}
	sendBtnClick(){
		this.textarea = this.box.querySelector("textarea").value;
		this.username = document.querySelector("#username").value;
		if(this.textarea === ""){
			alert("内容不能为空");
		}
		else if(this.username === ""){
			alert("用户名不能为空");
		}
		else {
			this.btn.classList.add("ac");
			this.box.style.display = "none";
			this.modal.style.display="none";
			var date = new Date();
			this.time = date.getTime();
			var years = date.getFullYear();
			var months = date.getMonth() + 1;
			var days = date.getDate();
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var seconds = date.getSeconds();
			this.div.innerHTML= `${this.username}:&nbsp;${this.textarea}<br/>${years}/${months}/${days}&nbsp;${hours}:${minutes}:${seconds}`;
			document.body.appendChild(this.div);
			this.Create();
			this.Del();
		}
	}
	Create(){
		this.div.oncontextmenu = (e) =>{
			e.preventDefault();
			let ul = document.createElement("ul");
			this.ul.innerHTML = `<li id = "del" class="del">撤回</li>`;
			document.body.appendChild(this.ul);
			}
		}
	Del(){
		this.ul.onclick = (e) =>{
			let date2 = new Date();
			let time2 = date2.getTime();
			if(e.target.id == "del"){
				if(time2 - this.time < 2*60*1000){
					this.div.parentNode.removeChild(this.div);
					document.body.removeChild(this.ul);
					this.btn.classList.remove("ac");
				}
				else{
					alert("不能撤回超过两分钟的消息");
					document.body.removeChild(this.ul);
		
				}
			}
		}
	}
	
}
new Send("#btn");