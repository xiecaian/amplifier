var Amplifier = (function(){
    var Amplifier = function(node){
        this.node = node;
        this.move;
        this.img;
        this.wrap;
        this.init();
    }
    Amplifier.prototype = {
        init : function(){
            var config;
            config = this.getConfig();
            this.setConfig(config);
            this.bindEvent();
        },
        getConfig : function(){
            return JSON.parse(this.node.getAttribute('data-config'));
          
        },
        setConfig : function(Elem){
            this.wrap = document.getElementsByClassName(Elem.wrap)[0];
            this.move = document.getElementsByClassName(Elem.move)[0];
            this.img = document.getElementsByClassName(Elem.img)[0];
        },
        bindEvent : function(){
            var _self = this,
                enterMove = this.enterMove.bind(_self);
            addEvent(this.wrap,'mouseenter',function(){
                /**子元素还是会触发用mouseover，节省性能用mouseenter */

                addEvent(this,'mousemove',enterMove);/**这里的this指向this.imgWrap */
            });
            addEvent(this.wrap,'mouseleave',function(){
                _self.move.className = 'move';
                _self.img.className = 'img';
                removeEvent(this,'mousemove',enterMove);
            });

        },
        enterMove : function(){
            console.log(1);
            this.move.className += ' active';
            this.img.className += ' active';
            this.imgShow();
        },
        imgShow : function(e){
            var e = e || window.event,
             tar = e.target || e.srcElement,
             wrapX = this.wrap.offsetLeft,/*总盒子的偏移量*/
             wrapY = this.wrap.offsetTop,/*总盒子的偏移量*/
             x = getPagePos(e).Left - getStyle(this.move,'width')/2-wrapX,
             y = getPagePos(e).Top - getStyle(this.move,'height')/2-wrapY;
             console.log(x);
            var  imgx = -2*x +  getStyle(this.img,'width')/2,/**总共400，偏移了200 */
             imgY = -2*y + getStyle(this.img,'height')/2;
             /**设置范围 */
             if( x< 0){
                 x = 0;
             }
             else if( x + getStyle(this.move,'width') > getStyle(this.wrap,'width')){
                 /** x : move的left， + move的宽度 > 总的盒子的宽度*/
                 x = getStyle(this.wrap,'width') - getStyle(this.move,'width');
             }
             if(y < 0){
                 y = 0;
             }
             else if(y + getStyle(this.move,'height') > getStyle(this.wrap,'height')){
                y = getStyle(this.wrap,'height') - getStyle(this.move,'height');
             }
            this.move.style.left = x + 'px';
            this.move.style.top = y +'px';
            this.img.style.left = imgx +'px';
            this.img.style.top = imgY +'px';
        }
    }
    return Amplifier;
})();  

new Amplifier(document.getElementsByClassName('wrap')[0]);