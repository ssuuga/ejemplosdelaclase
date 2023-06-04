class Caminante{


	//--------------------------------------------------------------------

	constructor(){
		this.x = random( width );
        this.y = random( height );            
		this.d = 50;		
		this.vel = 4;
        this.dir = random( radians( 360 ));
        this.elColor = color(255);
	}

    actualizar( intensidad , altura , derivada ){

        this.dir -= radians( derivada * 20 );

        this.d = intensidad*50;
        push();
        colorMode( HSB , 255 , 255 , 255 , 255 );
        let tinte = map( altura , 0 , 1 , 10 , 255+42 );
        tinte = tinte % 255;
        this.elColor = color( tinte , 255 , 255 );
        pop();
    }
    //--------------------------------------------------------------------

    dibujar(){
        push();
        noStroke();
        fill( this.elColor );
        ellipse( this.x , this.y , this.d , this.d );		
        pop();
    }
    //--------------------------------------------------------------------

    mover(){

    //console.log( this.x + "   " + this.d ); 

    this.x = this.x + this.vel * cos( this.dir );
    this.y = this.y + this.vel * sin( this.dir );

    this.x = ( this.x > windowWidth ? this.x-windowWidth : this.x );
    this.x = ( this.x < 0 ? this.x+windowWidth : this.x );
    this.y = ( this.y > windowHeight ? this.y-windowHeight : this.y );
    this.y = ( this.y < 0 ? this.y+windowHeight : this.y );
    }




}