const removeNamespace = (name, namespace) => {
  if (namespace.endsWith('::')) {
    return name.replace(namespace, '');
  }
  return name.replace(`${namespace}.`, '');
};

export default { removeNamespace };
