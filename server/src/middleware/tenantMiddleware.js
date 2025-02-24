const checkTenant = async (req, res, next) => {
    const tenantId = req.user?.tenant_id;
    if (!tenantId) {
      return res.status(403).json({ message: 'Tenant ID required' });
    }
    req.tenantId = tenantId;
    next();
  };
  
  module.exports = checkTenant;