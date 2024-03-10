// generateWallets.js
const { ethers } = require('ethers');
const ExcelJS = require('exceljs');

async function generateWallets(walletCount, filename) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Wallets');

    // 添加表头
    sheet.columns = [
        { header: '编号', key: 'id', width: 10 },
        { header: '地址', key: 'address', width: 30 },
        { header: '私钥', key: 'privateKey', width: 50 },
        { header: '助记词', key: 'mnemonic', width: 50 },
        { header: '备注', key: 'note', width: 10 },
    ];

    for (let i = 1; i <= walletCount; i++) {
        const wallet = ethers.Wallet.createRandom();
        const { address, privateKey, mnemonic } = wallet;

        sheet.addRow({
            id: i,
            address,
            privateKey,
            mnemonic: mnemonic.phrase,
            note: '', // 可以根据需要添加备注
        });
    }

    await workbook.xlsx.writeFile(filename);
    console.log(`Generated ${walletCount} wallets in ${filename}`);
}

module.exports = generateWallets;
