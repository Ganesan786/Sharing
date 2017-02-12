angular.module('starter.directive', [])
.directive("navBtn",function(){
	return {
		transclude: true,
		template:"<div class='pullRight'><span class='iconBtnAlign mR-10'><a href='#/tab/dash'><i class='material-icons' >clear</i></a>"+
		"</span><span class='iconBtnAlign'><i class='material-icons'>done</i></span>"+
   		"</div>"
	}
});