const tape = require('tape')
const vss = require('../')
const bls = require('bls-lib')

bls.onModuleInit(() => {
  tape('tests', (t) => {
    bls.init()
    const threshold = 5
    const numOfPlayers = 7
    const setup = vss.createShare(bls, numOfPlayers, threshold)

    setup.shares.forEach(share => {
      const verified = vss.verifyShare(bls, share, setup.verifcationVector)
      t.true(verified, 'should verify share')
    })

    const secret = vss.recoverSecret(bls, setup.shares.slice(0, threshold))

    t.deepEqual(secret, setup.secret, 'should recover the secert')
    t.end()
  })
})
