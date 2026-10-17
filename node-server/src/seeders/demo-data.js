'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // ---------- utilisateur ----------
    // ⚠️ Si ton système d'authentification hash les mots de passe (bcrypt, etc.),
    // remplace 'motdepasse123' par un hash généré avec le même algo, sinon
    // la connexion échouera lors de la comparaison des mots de passe.
    await queryInterface.bulkInsert('utilisateur', [
      {
        id: 1,
        email: 'admin@atelier-couteaux.fr',
        password: 'motdepasse123',
        role: 'admin'
      }
    ]);

    // ---------- couteau ----------
    await queryInterface.bulkInsert('couteau', [
      {
        photo_1: '/uploads/couteaux/couteau1_photo1.jpg',
        photo_2: null,
        photo_3: null,
        lame: 'Acier damas',
        garde: 'Laiton',
        etui: 'Cuir cousu main',
        prix: 189.90,
        manche: 'Bois de noyer',
        gamme: 'Bowie',
        vendu: false,
        utilisateur_id: 1
      },
      {
        photo_1: '/uploads/couteaux/couteau2_photo1.jpg',
        photo_2: '/uploads/couteaux/couteau2_photo2.jpg',
        photo_3: null,
        lame: 'Acier inoxydable 440C',
        garde: 'Inox',
        etui: 'Etui en kydex',
        prix: 129.00,
        manche: 'Micarta noir',
        gamme: 'Bowie',
        vendu: false,
        utilisateur_id: 1
      },
      {
        photo_1: '/uploads/couteaux/couteau3_photo1.jpg',
        photo_2: null,
        photo_3: null,
        lame: 'Acier carbone XC75',
        garde: 'Cuivre',
        etui: 'Cuir brut',
        prix: 249.50,
        manche: 'Corne de cerf',
        gamme: 'Bowie',
        vendu: true,
        utilisateur_id: 1
      }
    ]);

    // ---------- evenement ----------
    await queryInterface.bulkInsert('evenement', [
      {
        titre: 'Salon du couteau de Nogent',
        description: 'Exposition et vente de couteaux artisanaux, démonstrations de forge.',
        ville: 'Nogent',
        date: '2026-11-14',
        heure: '09:00:00',
        photo_1: '/uploads/evenements/salon-nogent.jpg',
        photo_2: null,
        photo_3: null,
        statut: 'a_venir',
        utilisateur_id: 1
      },
      {
        titre: 'Marché artisanal de Noël',
        description: 'Stand de vente de couteaux faits main, idées cadeaux.',
        ville: 'Strasbourg',
        date: '2026-12-06',
        heure: '10:00:00',
        photo_1: '/uploads/evenements/marche-noel.jpg',
        photo_2: null,
        photo_3: null,
        statut: 'a_venir',
        utilisateur_id: 1
      },
      {
        titre: 'Portes ouvertes de l\'atelier',
        description: 'Découverte de l\'atelier de coutellerie et démonstration de fabrication.',
        ville: 'Bischwiller',
        date: '2026-06-20',
        heure: '14:00:00',
        photo_1: '/uploads/evenements/portes-ouvertes.jpg',
        photo_2: null,
        photo_3: null,
        statut: 'termine',
        utilisateur_id: 1
      }
    ]);

    // On corrige les séquences PostgreSQL car on a inséré des id explicites
    // pour utilisateur (id:1). Sans ça, la prochaine insertion automatique
    // (via l'app) risquerait de rentrer en conflit avec l'id 1.
    await queryInterface.sequelize.query(
      `SELECT setval(pg_get_serial_sequence('utilisateur', 'id'), (SELECT MAX(id) FROM utilisateur));`
    );
  },

  down: async (queryInterface) => {
    // Ordre inverse à cause des clés étrangères
    await queryInterface.bulkDelete('evenement', null, {});
    await queryInterface.bulkDelete('couteau', null, {});
    await queryInterface.bulkDelete('utilisateur', null, {});
  }
};
