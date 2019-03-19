const { VocabList, VocabItem } = require("../../models");
const { AuthenticationError } = require("apollo-server");
export const VocabListResolver = {
  Query: {
    vocabLists: async (rootValue, args, context) => {
      const user = await context.user;
      try {
        return VocabList.findAll({
          where: {
            user
          }
        }).then(function(vocabLists) {
          return vocabLists;
        });
      } catch (e) {
        throw new AuthenticationError("You must be logged in to do this");
      }
    },
    vocabListsNoToken: (rootValue, args) => {
      return VocabList.findAll({
        include: [
          {
            model: VocabItem
          }
        ]
      }).then(function(vocabLists) {
        return vocabLists;
      });
    },
    vocabList: async (rootValue, args, context) => {
      try {
        const user = await context.user;
        return VocabList.findById(args.id, {
          where: {
            user
          },
          include: [
            {
              model: VocabItem
            }
          ]
        });
      } catch (e) {
        throw new AuthenticationError("You must be logged in to do this");
      }
    },
    vocabListByListName: async (rootValue, args, context) => {
      try {
        const user = await context.user;
        return VocabList.findOne({
          where: {
            listName: args.listName,
            user
          },
          include: [
            {
              model: VocabItem,
              where: {
                toReviewDate: null
              }
            }
          ]
        }).then(function(vocabList) {
          return vocabList;
        });
      } catch (e) {
        throw new AuthenticationError("You must be logged in to do this");
      }
    }
  },
  Mutation: {
    vocabListAdd: async (_, args, context) => {
      try {
        const user = await context.user;
        console.log("user = ", user);
        const vocabList1 = await VocabList.create({
          listName: args.vocabList.listName,
          user
        });
        if (args.vocabList.VocabItems) {
          //el validator no treu els items empty, aixi que ho fem manualment
          const vocabNoEmpty = args.vocabList.VocabItems.filter(
            item => item.word.length > 0 && item.translation.length > 0
          );

          // creamos los items y los linkamos a la lista
          const vocabItems = await VocabItem.bulkCreate(vocabNoEmpty, {
            returning: true
          });
          vocabList1.addVocabItems(vocabItems);
        }
        return vocabList1;
      } catch (e) {
        throw new AuthenticationError("You must be logged in to do this");
      }
    }
  }
};
