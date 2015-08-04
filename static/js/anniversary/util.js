function randomResult(totalCount, dom){
	var n = parseInt(Math.random()*totalCount)+1;
	var domStr = dom.replace('{n}', n);
	var result = {
		'n': n,
		'domStr': domStr
	}
	return result
}