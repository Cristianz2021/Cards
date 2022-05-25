/*Dark-mode*/
const toggleIcon = document.getElementById('toogle-icon');
const modeDark = document.getElementById('dark-mode');

toggleIcon.addEventListener('click', () =>{
	document.body.classList.toggle('dark');

	if(modeDark.src.includes('moon.svg')){
		modeDark.src= './img/sun.svg';
	} else{
		modeDark.src= './img/moon.svg';
	}
});