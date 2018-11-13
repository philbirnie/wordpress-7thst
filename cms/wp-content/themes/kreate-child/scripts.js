/** ReservationsOnline Javascript Engine start */
var _rod = {
    setAccount: 'Burtonwood',
    setTitle: 'Book Online',
    setButton: 'check rates',
    setAdults: 'Adults',
    setChildren: 'Under 17',
    setPets: '',
    setEngine: 'overlay',
    setSize: 'tiny'
};

(function() {
    var rodp = document.createElement('script'); rodp.type = 'text/javascript'; rodp.async = true;
    rodp.src = 'https://www2.reservationsonline.com/addons/loader.asp';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(rodp, s);
})();
/** ReservationsOnline Javascript Engine end */
