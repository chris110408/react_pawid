import { createCurrentAuth,checkPermissions } from './CheckPermissions.js';

const target = 'ok';
const error = 'error';

// (authority, childrenRender, noMatch, currentAuthority)

describe('test CheckPermissions', () => {
    it('createCurrentAuth', () => {
        expect(createCurrentAuth('user')).toEqual('user');
    });

  it('Correct string permission authentication', () => {
    expect(checkPermissions('user', target, error)('user')).toEqual('ok');
  });
  it('Correct string permission authentication', () => {
    expect(checkPermissions('user', target, error)('NULL')).toEqual('error');
  });
  it('authority is undefined , return ok', () => {
    expect(checkPermissions(null, target, error)('NULL')).toEqual('ok');
  });
  it('currentAuthority is undefined , return error', () => {
    expect(checkPermissions('admin', target, error)(null)).toEqual('error');
  });
  it('Wrong string permission authentication', () => {
    expect(checkPermissions('admin', target, error)('user')).toEqual('error');
  });
  it('Correct Array permission authentication', () => {
    expect(checkPermissions(['user', 'admin'], target, error)('admin')).toEqual('ok');
  });
  it('Wrong Array permission authentication,currentAuthority error', () => {
      expect(checkPermissions(['user', 'admin'], target, error)('admin,user')).toEqual('error');
  });
  it('Wrong Array permission authentication', () => {
    expect(checkPermissions(['user', 'admin'], target, error)('guest')).toEqual('error');
  });
  it('Wrong Function permission authentication', () => {
    expect(checkPermissions(() => false, target, error)('guest')).toEqual('error');
  });
  it('Correct Function permission authentication', () => {
    expect(checkPermissions(() => true, target, error)('guest')).toEqual('ok');
  });
});
