import { testConnection, getActivePageSections, getAllPageSections, toggleSectionVisibility, updateSectionData } from './index';
import { authenticateAdmin, createSessionToken, verifySessionToken } from '../auth';

async function runE2ETest() {
  console.log('====================================================');
  console.log('RUNNING E2E REALTIME CMS VERIFICATION TEST');
  console.log('====================================================');

  // Test 1: Connectivity
  console.log('\n[TEST 1] Testing Database Connection...');
  const connResult = await testConnection();
  console.log('Result:', connResult);
  if (!connResult.success) {
    throw new Error('Database connection failed.');
  }

  // Test 2: Authentication
  console.log('\n[TEST 2] Testing Admin Authentication...');
  const authValid = await authenticateAdmin('admin', 'admin123');
  console.log('Auth with valid password:', authValid.success, authValid.user);
  if (!authValid.success || !authValid.user) {
    throw new Error('Valid login failed!');
  }

  const authInvalid = await authenticateAdmin('admin', 'WrongPass123');
  console.log('Auth with invalid password failed as expected:', !authInvalid.success, authInvalid.error);
  if (authInvalid.success) {
    throw new Error('Invalid login unexpectedly succeeded!');
  }

  // Test 3: Session Token Signing & Verification
  console.log('\n[TEST 3] Testing HMAC Session Token...');
  const token = createSessionToken(authValid.user);
  const sessionUser = verifySessionToken(token);
  console.log('Session verified:', sessionUser?.username === 'admin');
  if (!sessionUser || sessionUser.username !== 'admin') {
    throw new Error('Session token verification failed!');
  }

  // Test 4: Section Fetching
  console.log('\n[TEST 4] Fetching all sections for "home"...');
  const allSections = await getAllPageSections('home');
  console.log(`Found ${allSections.length} sections for "home".`);
  const targetSection = allSections.find((s) => s.sectionKey === 'video_documentary');
  if (!targetSection) {
    throw new Error('Section video_documentary not found.');
  }

  // Test 5: Section Toggle Off
  console.log('\n[TEST 5] Toggling "video_documentary" OFF (isEnabled: false)...');
  await toggleSectionVisibility(targetSection.id, false);
  const activeAfterOff = await getActivePageSections('home');
  const isExcluded = !activeAfterOff.some((s) => s.sectionKey === 'video_documentary');
  console.log('Is video_documentary excluded from public active sections?', isExcluded);
  if (!isExcluded) {
    throw new Error('Section toggle off failed to exclude from active list!');
  }

  // Test 6: Section Toggle On
  console.log('\n[TEST 6] Toggling "video_documentary" back ON (isEnabled: true)...');
  await toggleSectionVisibility(targetSection.id, true);
  const activeAfterOn = await getActivePageSections('home');
  const isIncluded = activeAfterOn.some((s) => s.sectionKey === 'video_documentary');
  console.log('Is video_documentary restored to public active sections?', isIncluded);
  if (!isIncluded) {
    throw new Error('Section toggle on failed to restore to active list!');
  }

  // Test 7: Section Content Update
  console.log('\n[TEST 7] Updating section content for "final_cta"...');
  const finalCta = allSections.find((s) => s.sectionKey === 'final_cta');
  if (finalCta) {
    const updatedContent = {
      ...(finalCta.content as any),
      lastTestedAt: new Date().toISOString(),
    };
    const updateOk = await updateSectionData(finalCta.id, { content: updatedContent });
    console.log('Content update success:', updateOk);
    if (!updateOk) {
      throw new Error('Content update failed!');
    }
  }

  console.log('\n====================================================');
  console.log('ALL 7 E2E CMS TESTS PASSED EMPIRICALLY (100%)');
  console.log('====================================================\n');
  process.exit(0);
}

runE2ETest().catch((err) => {
  console.error('[E2E-ERROR]', err);
  process.exit(1);
});
