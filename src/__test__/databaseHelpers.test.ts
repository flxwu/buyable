/* eslint-env jest */
import { isUserDuplicate } from '../helpers/database';

describe('#isUserDuplicate() with false input', () => {
  it('should return duplicate [string, array]', () => {
    const isDuplicate = isUserDuplicate('apiTest1', ['username', 'email']);
    expect(isDuplicate).toBeDefined();
    expect(isDuplicate).toBeTruthy();
  });
});

describe('#isUserDuplicate() with duplicate input', () => {
  it('should return duplicate [string, string]', () => {
    const isDuplicate = isUserDuplicate('apiTest1', 'username');
    expect(isDuplicate).toBeDefined();
    expect(isDuplicate).toBeTruthy();
  });

  it('should return duplicate [array, array]', () => {
    const isDuplicate = isUserDuplicate(
      ['apiTest1@api.com', 'apiTest1'],
      ['email', 'username']
    );
    expect(isDuplicate).toBeDefined();
    expect(isDuplicate).toBeTruthy();
  });
});

describe('#isUserDuplicate() with non-duplicate input', () => {
  it('should return not duplicate [string, string]', () => {
    const isDuplicate = isUserDuplicate(
      'g43CWjn6FCbam&zBSNGONPCadVt7ye4fAfQc@ItaG&vr0c$osl',
      'username'
    );
    expect(isDuplicate).toBeDefined();
    expect(isDuplicate).toEqual(false);
  });

  it('should return not duplicate [array, array]', () => {
    const isDuplicate = isUserDuplicate(
      [
        'g43CWjn6FCbam&zBSNGONPCadVt7ye4fAfQc@ItaG&vr0c$osl',
        'zBSNGONPCadVt7ye4fAfQc@zBSNGONPCadVt7ye4fAfQc.com'
      ],
      ['username', 'email']
    );
    expect(isDuplicate).toBeDefined();
    expect(isDuplicate).toEqual(false);
  });
});
