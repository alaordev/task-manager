/* IMPORTANTATE: PRECISA SER HTTPS PARA O SW OPERAR */
if ('serviceWorker' in navigator) {
	alert('aqui');
	navigator.serviceWorker.register('/sw.js', {scope: '/'})
	.then(function(reg) {
		alert('s');
	// registration worked
	console.log('Registration succeeded. Scope is ' + reg.scope);
	}).catch(function(error) {
		alert('n');
	// registration failed
	console.log('Registration failed with ' + error);
	});
}

function getKeyPress(e){
	e = e || window.event;
	e.preventDefault();
	return (e.keyCode == 13)
		? (document.getElementById('add_edit_task').click(), false)
		: true
}

Vue.component( 'task-item' , {
	props: ['task'],
	template: `
		<dl>
			<dt>
				<i class="material-icons">trending_flat</i><!--
				--><div>{{ task.description }}</div>
			</dt><!--
			--><dd>
				<i class="material-icons" v-on:click="$emit('edit')">mode_edit</i>
				<i class="material-icons" v-on:click="$emit('done')">done</i>
				<i class="material-icons" v-on:click="$emit('delete')">clear</i>
			</dd>
		</dl>
	`
});


//localStorage.removeItem('app_tasks');

var getEmptyStorage = function(){
	return JSON.stringify({
				tasks: [],
				count:{
					done: 0,
					deleted: 0
				}
			});
}

var app_tasks = (typeof(Storage) !== "undefined")
			? (
				(typeof(localStorage.app_tasks) !== "undefined") 
					? localStorage.app_tasks 
					: (
						localStorage.app_tasks = getEmptyStorage(),
						localStorage.app_tasks)
			)
			: getEmptyStorage();

var app = new Vue({
	el: "#app",
	data: {
		edit_task_key: -1,
		task_description: '',
		tasks: JSON.parse(app_tasks).tasks,
		count: {
			done: JSON.parse(app_tasks).count.done,
			deleted: JSON.parse(app_tasks).count.deleted
		}
	},
	methods: {
		addTask: function(){
			var isNotEmpty = function(vue){
				return vue.task_description;
			};

			var isEdit = function(vue){
				
				return vue.edit_task_key != -1
					? (
						vue.tasks[vue.edit_task_key].description = vue.task_description, 
						vue.edit_task_key = -1, 
						true)
					: (
						vue.tasks.push({ description: vue.task_description }), 
						false);
			};

			isNotEmpty(this) && isEdit(this);
			document.getElementById('add_edit_task').innerHTML = "Adicionar tarefa";
			this.sanitizeField();
		},
		editTask: function(index){
			this.edit_task_key = index;
			document.getElementById('add_edit_task').innerHTML = "Editar tarefa";
			this.sanitizeField();
		},
		doneTask: function(index){
			this.tasks.splice(index,1);
			this.count.done++;
			this.sanitizeField();
		},
		deleteTask: function(index){
			this.tasks.splice(index,1);
			this.count.deleted++;
			this.sanitizeField();
		},
		clearCount: function(index){
			this.count[index] = 0;
			this.sanitizeField();
		},
		/*** general ***/
		sanitizeField: function(){
			console.log(this.edit_task_key);
			this.task_description = (this.edit_task_key != -1) ? this.tasks[this.edit_task_key].description : '';
			document.getElementById('task_description').focus();
			this.updateStorage();
		},
		updateStorage: function(){
			(typeof(Storage) !== "undefined") && (
				temp = JSON.parse(localStorage.app_tasks),
				temp.tasks = this.tasks,
				temp.count.done = this.count.done,
				temp.count.deleted = this.count.deleted,
				localStorage.app_tasks = JSON.stringify(temp)
			);
			console.log(localStorage.app_tasks);
		}
	}
});
