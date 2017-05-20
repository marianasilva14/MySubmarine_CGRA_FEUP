/**
 * Bezier
 * @constructor
 */

 function Bezier() {
 };

 Bezier.prototype.bezierFunction= function(t,x,y,z,x4,y4,z4,vx,vy,vz,s){
   
   var xb = Math.pow(t,2)*(3*x4-6*(x+(6*vx)/s)+3*x)+Math.pow(t,3)*(-2*x4+3*(x+(6*vx)/s)-x)+t*(3*(x+(6*vx)/s)-3*x)+x;
   var yb = Math.pow(t,2)*(3*(y4+3)-6*(y+(6*vy)/s)+3*y)+Math.pow(t,3)*(-3*(y4+3)+y4+3*(y+(6*vy)/s)-y)+t*(3*(y+(6*vy)/s)-3*y)+y;
   var zb = Math.pow(t,2)*(3*z4-6*(z+(6*vz)/s)+3*z)+Math.pow(t,3)*(-2*z4+3*(z+(6*vz)/s)-z)+t*(3*(z+(6*vz)/s)-3*z)+z;

   return [xb,yb,zb];
 };

 Bezier.prototype.bezierDerivateFunction = function(t,x,y,z,x4,y4,z4,vx,vy,vz,s){

 var xb= 2*t*(3*x4-6*(x+(6*vx)/s)+3*x)+3*Math.pow(t,2)*(-2*x4+3*(x+(6*vx)/s)-x)+3*(x+(6*vx)/s)-3*x;
 var yb =2*t*(3*(y4+3)-6*(y+(6*vy)/s)+3*y)+3*Math.pow(t,2)*(-3*(y4+3)+y4+3*(y+(6*vy)/s)-y)+3*(y+(6*vy)/s)-3*y;
 var zb= 2*t*(3*z4-6*(z+(6*vz)/s)+3*z)+3*Math.pow(t,2)*(-2*z4+3*(z+(6*vz)/s)-z)+3*(z+(6*vz)/s)-3*z;

   return [xb,yb,zb];
 };
