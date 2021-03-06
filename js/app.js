(function (window) {
	'use strict';
	// Your starting point. Enjoy the ride!
	// 注册自定义指令
	Vue.directive('focus', {
		// 进入页面，让添加任务文本框获得焦点
		inserted(el) {
			// console.log('inserted')
			el.focus()
		},

		// 数据更新时，让当前 编辑项的文本框 获得焦点
		update(el, binding) {
			// 为了提升性能，我们判断一下，只有 当前项 为编辑状态的时候，才让当前项的文本框
			// 获得焦点
			if (binding.value) {
				console.log('update', binding.value)
				el.focus()
			}
		}
	})

	// let list = JSON.parse(localStorage.getItem('list') || '[]')
	const vm = new Vue({
		el: '#app',
		created() {
			this.list=JSON.parse(localStorage.getItem('list') || '[]')
		},
		data: {
			list: '',
			inputValue: '',
			editid: -1,
			hides: -1,
			index: 1,
			none: false
		},
		methods: {
			// 添加代办项
			keyUp() {
				if (this.inputValue.trim() === '') {
					return
				}
				let id = this.list.length === 0 ? 1 : this.list[this.list.length - 1].id + 1
				this.list.push({
					id: id,
					todoName: this.inputValue,
					done: false
				})
				this.inputValue = ''
			},
			// 删除
			delectClick(id) {
				this.list = this.list.filter(item => item.id != id)
			},
			// 显示编辑
			dblClick(id) {
				this.editid = id
				let index = this.list.findIndex(item => item.id == id)
				this.list[index].done = false
				this.hides = -1
			},
			//  隐藏编辑
			enter() {
				this.editid = -1
			},
			// 底部清除完成
			Clearclick() {
				this.list = this.list.filter(item => item.done != true)
				// this.hides = -1
			},
			// All
			allClick() {
				this.hides = -1
				this.index = 1
			},
			// active 
			activeClick() {
				this.hides = true
				this.index = 2
			},
			// Completed
			Completedclick() {
				this.hides = false
				this.index = 3
			},
			AllClick() {
				let checked = true
				if (this.all) {
					checked = false
				}
				this.list = this.list.map(function (item) {
					item.done = checked
					return item
				})
			}
		},
		computed: {
			// 底部显示与隐藏
			fun() {
				return this.list.length > 0
			},
			// 显示代办项数量
			num() {
				return this.list.filter(item => item.done != true).length
			},
			clear() {
				return this.list.some(item => item.done == true)
			},
			// 单选控制全选
			all() {
				return this.list.every(item => item.done === true)
			},
		},
		watch: {
			list: {
				deep: true,
				handler(newvalue) {
					localStorage.setItem('list', JSON.stringify(this.list))
				}
			}
		}
	})
})(window);
