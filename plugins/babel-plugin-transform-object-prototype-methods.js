module.exports = function (babel) {
  const { types: t } = babel;
  const PropertySchema = {
    hasOwnProperty: {
      type: "boolean",
      default: true
    },
    isPrototypeOf: {
      type: "boolean",
      default: true
    },
    propertyIsEnumerable: {
      type: "boolean",
      default: true
    }
  };

  const defaultOpts = {
    hasOwnProperty: PropertySchema.hasOwnProperty.default,
    isPrototypeOf: PropertySchema.isPrototypeOf.default,
    propertyIsEnumerable: PropertySchema.propertyIsEnumerable.default
  };

  return {
      name: "ast-transform", // not required
      visitor: {
        CallExpression(path, state) {
            const memberExp = path.get("callee");
            const arg = path.get("arguments.0");
            const memberProperty = memberExp.get("property");
            const memberObject = memberExp.get("object");
            const options = Object.assign({}, defaultOpts, state.opts);
            const propertyName = memberProperty.node.name;
            if (t.isIdentifier(memberProperty) && PropertySchema[propertyName] && options[propertyName]) {
              const objectMemberExp = t.MemberExpression(t.Identifier("Object"), t.Identifier("prototype"));
              const prototypeMemberExp = t.MemberExpression(objectMemberExp, t.Identifier(propertyName));
              const callMemberExp = t.MemberExpression(prototypeMemberExp, t.Identifier("call"));
              const newCallExpression = t.callExpression(callMemberExp, [memberObject.node, arg.node]);
              path.replaceWith(newCallExpression);
            }
          }
      }
  };
}