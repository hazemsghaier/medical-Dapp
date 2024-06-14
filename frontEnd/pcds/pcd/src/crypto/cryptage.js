import forge from 'node-forge';
export function generateKeyPair() {
    // Generate RSA key pair
    const rsa = forge.pki.rsa;
    const keypair = rsa.generateKeyPair({ bits: 2048, e: 0x10001 });

    // Get public and private keys in PEM format
    const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
    const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);

 return [privateKeyPem,publicKeyPem]
};
export function decryptData(privateKey, encryptedData) {
  const privateKeyObj = forge.pki.privateKeyFromPem(privateKey);
  const encryptedBytes = forge.util.decode64(encryptedData);
  const decrypted = privateKeyObj.decrypt(encryptedBytes);
  return decrypted;
}
export function encryptData(publicKey, plaintext) {
    const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
    const encrypted = publicKeyObj.encrypt(plaintext);
    return encrypted
}

