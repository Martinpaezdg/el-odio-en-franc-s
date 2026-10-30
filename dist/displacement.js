// Campo de desplazamiento animado: refracción acanalada, ondas y desgarros.
// Puro: nunca modifica el fotograma de entrada ni accede a cámara/DOM.
(function(root){
  const clamp=(n,max)=>Math.max(0,Math.min(max,n));
  function warp(src,w,h,time,amount,cx=.5,cy=.46,out=new Uint8ClampedArray(src.length)){
    if(amount<=0){out.set(src);return out}
    const t=time/1000,a=amount/100,sxScale=w/640,syScale=h/360;
    const cols=new Float32Array(w),rows=new Float32Array(h),gx=new Float32Array(w),gy=new Float32Array(h),vertical=new Float32Array(w);
    for(let x=0;x<w;x++){const nx=x/w;cols[x]=Math.sin(nx*72+t*.7)*12+Math.sin(nx*31-t*.4)*8;vertical[x]=Math.sin(nx*55+t*.6)*17+Math.sin(nx*13-t*.7)*12;gx[x]=Math.exp(-(((nx-cx)/.33)**2))}
    for(let y=0;y<h;y++){const ny=y/h;rows[y]=Math.sin(ny*24-t*.9)*16+Math.sin(ny*63+t*.5)*7;gy[y]=Math.exp(-(((ny-cy)/.43)**2))}
    const tearY=(.44+Math.sin(t*.65)*.19)*h;
    for(let y=0;y<h;y++){const tear=Math.max(0,1-Math.abs(y-tearY)/(h*.045))*Math.sin(t*1.6)*25;for(let x=0;x<w;x++){
      const field=.18+.82*gx[x]*gy[y];
      const xx=clamp(x+a*sxScale*(rows[y]+cols[x]*1.4+tear)*field,w-1);
      const yy=clamp(y+a*syScale*vertical[x]*field,h-1);
      const x0=Math.floor(xx),y0=Math.floor(yy),x1=Math.min(x0+1,w-1),y1=Math.min(y0+1,h-1),fx=xx-x0,fy=yy-y0;
      const p=(y0*w+x0)*4,q=(y0*w+x1)*4,r=(y1*w+x0)*4,s=(y1*w+x1)*4,i=(y*w+x)*4;
      for(let c=0;c<3;c++)out[i+c]=(src[p+c]*(1-fx)+src[q+c]*fx)*(1-fy)+(src[r+c]*(1-fx)+src[s+c]*fx)*fy;
      out[i+3]=255;
    }}return out;
  }
  root.GrungeDisplacement={warp};
})(globalThis);
