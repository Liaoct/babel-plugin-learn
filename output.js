var hasBarProperty = Object.prototype.hasOwnProperty.call(foo, "bar");
var isPrototypeOfBar = foo.isPrototypeOf(bar);
var barIsEnumerable = Object.prototype.propertyIsEnumerable.call(foo, "bar");

if (Object.prototype.hasOwnProperty.call(foo, "bar")) {}

if (foo.isPrototypeOf(bar)) {}

if (Object.prototype.propertyIsEnumerable.call(foo, "bar")) {}
