const { editAdmin } = require('../lib/admin-actions.ts');
const { permissionStringToEnum } = require('../models/AdminInfo.ts');

const id = process.argv[2];
const permissionString = process.argv[3];

editAdmin(id, permission_level);