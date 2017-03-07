var ttDelay = 800,
	ttTimeout;

(function() {
	var ttDiv = document.createElement('div');
	ttDiv.id = 'tt-div';
	ttDiv.innerHTML = '<img id="tt-arrow" src="img/arrow-tooltips.png" ondragstart="event.preventDefault()"><div id="tt-content"></div>';
	document.body.appendChild(ttDiv);
})();

function showTooltip(el) {
	var rectEl = el.getBoundingClientRect();
	if (!(rectEl.height == 0 && rectEl.width == 0)) {
		var gutter = 12;
		var ttDiv = document.getElementById('tt-div');
		var screenX = document.body.clientWidth;
		ttDiv.style.display = 'block';
		var ttContent = document.getElementById('tt-content');
		var ttArrow = document.getElementById('tt-arrow');
		var rectContent = ttContent.getBoundingClientRect();
		var centerX = (rectEl.left + rectEl.width/2);
		var x = Math.round(centerX - rectContent.width/2);
		var xMod = 0;
		if (x + rectContent.width + gutter > screenX) {
			xMod = (x + rectContent.width + gutter) - screenX;
		}
		if (x < gutter) {
			//x = gutter;
			xMod = -12;
		}
		ttDiv.style.left = (x - xMod) + 'px';
		ttContent.style.marginTop = (ttArrow.offsetHeight - 1) + 'px';
		ttArrow.style.marginLeft = Math.round(rectContent.width/2 - ttArrow.offsetWidth/2 + xMod) + 'px';
		ttDiv.style.top = Math.round(rectEl.top + rectEl.height) + 'px';
		ttDiv.style.opacity = 0;
		Kaylee.animate(ttDiv, [
			{
				from: 0,
				to: 1,
				unit: '',
				style: 'opacity'
			},{
				from: 7,
				to: 4,
				unit: 'px',
				style: 'translateY'
			}
		], 150);
	}
}

function hideTooltip() {
	if (typeof ttTimeout !== "undefined") {
		clearTimeout(ttTimeout);
	}
	var ttDiv = document.getElementById('tt-div');
	Kaylee.animate(ttDiv, [
		{
			from: 1,
			to: 0,
			unit: '',
			style: 'opacity'
		},{
			from: 4,
			to: 7,
			unit: 'px',
			style: 'translateY'
		}
	], 150, {
		callback: function() {
			document.getElementById('tt-div').style.display = 'none';
		}
	});
}

function tooltip(el, str) {
	ttTimeout = setTimeout(function() {
		var ttContent = document.getElementById('tt-content');
		var ttDiv = document.getElementById('tt-div');
		ttDiv.style.left = 0;
		ttContent.innerHTML = str;
		ttDiv.style.opacity = 0;
		showTooltip(el);
	}, ttDelay);
	el.onmouseout = function() {
		hideTooltip();
	}
}