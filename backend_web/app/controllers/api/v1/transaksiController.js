const transaksiService = require("../../../services/transaksiService");
const userService = require("../../../services/userService");
const productService = require("../../../services/productService");
const penawaranService = require("../../../services/penawaranService");
const mail = require("./notificationController");

function rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

module.exports = {
  async createTransaksi(req, res) {
    transaksiService
      .create({
        id_seller: req.body.id_seller,
        id_offering: req.body.id_offering,
        id_buyer: req.body.id_buyer,
        id_product: req.body.id_product,
        status: req.body.status,
      })
      .then((post) => {
        res.status(200).json({
          status: "OK",
          data: post,
        });
        const sid = post.id_seller;
        const bid = post.id_buyer;
        const pid = post.id_product;
        const oid = post.id_offering;
        userService.findEmail(sid).then((seller) => {
          const semail = seller.email;
          const sname = seller.name;
          userService.findEmail(bid).then((buyer) => {
            const bmail = buyer.email;
            const bname = buyer.name;
            productService.findProduct(pid).then((product) => {
              const pname = product.product_name;
              penawaranService.findOffer(oid).then((offer) => {
                const price = offer.offering_price;
                const btitle = "Penawaran diterima";
                const stitle = "Menerima penawaran";
                const stemp = "acceptoffer";
                const btemp = "offeraccepted";
                const message =
                  "Penawaran sebesar " + rupiah(price) + " diterima";
                mail.notifApp(btitle, bid, pid, oid, message);
                mail.notifApp(stitle, sid, pid, oid, message);
                mail.sendMail(bmail, btitle, btemp, bname, pname, price);
                mail.sendMail(semail, stitle, stemp, sname, pname, price);
              });
            });
          });
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async listTransaksi(req, res) {
    transaksiService
      .list()
      .then((transaction) => {
        res.status(201).json(transaction);
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async findAllProduct(req, res) {
    const transactions = await transaksiService
      .findAll()
      .then((transactions) => {
        res.status(200).json(transactions);
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async destroyTransaksi(req, res) {
    transaksiService
      .find(req.params.id)
      .then((post) => {
        const tid = post.id;
        const sid = post.id_seller;
        const bid = post.id_buyer;
        const pid = post.id_product;
        const oid = post.id_offering;
        userService.findEmail(sid).then((seller) => {
          const semail = seller.email;
          const sname = seller.name;
          userService.findEmail(bid).then((buyer) => {
            const bmail = buyer.email;
            const bname = buyer.name;
            productService.findProduct(pid).then((product) => {
              const pname = product.product_name;
              penawaranService.findOffer(oid).then((offer) => {
                const price = offer.offering_price;
                const btitle = "Transaksi dibatalkan";
                const stitle = "Membatalkan transaksi";
                const stemp = "cancletransaction";
                const btemp = "transactioncanceled";
                const message =
                  "Transaksi sebesar " + rupiah(price) + " dibatalkan";
                mail.notifApp(btitle, bid, pid, oid, message);
                mail.notifApp(stitle, sid, pid, oid, message);
                mail.sendMail(bmail, btitle, btemp, bname, pname, price);
                mail.sendMail(semail, stitle, stemp, sname, pname, price);
                transaksiService.delete(tid).then((transaksi) => {
                  res.status(200).json({
                    status: "OK",
                    message: "Transaction deleted",
                  });
                });
              });
            });
          });
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async findOneTransaction(req, res) {
    try {
      const transactions = await transaksiService
        .find(req.params.id)
        .then((transactions) => {
          res.status(200).json(transactions);
        })
        .catch((err) => {
          res.status(422).json({
            status: "FAIL",
            message: err.message,
          });
        });
    } catch (err) {
      res.status(422).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async updateTransaction(req, res) {
    try {
      let updateArgs = {
        status: req.body.status,
      };
      transaksiService.find(req.params.id).then((post) => {
        const tid = post.id;
        const sid = post.id_seller;
        const bid = post.id_buyer;
        const pid = post.id_product;
        const oid = post.id_offering;
        userService.findEmail(sid).then((seller) => {
          const semail = seller.email;
          const sname = seller.name;
          userService.findEmail(bid).then((buyer) => {
            const bmail = buyer.email;
            const bname = buyer.name;
            productService.findProduct(pid).then((product) => {
              const pname = product.product_name;
              penawaranService.findOffer(oid).then((offer) => {
                if (updateArgs.status === "GAGAL") {
                  const price = offer.offering_price;
                  const btitle = "Transaksi dibatalkan";
                  const stitle = "Membatalkan transaksi";
                  const stemp = "canceltransaction";
                  const btemp = "transactioncanceled";
                  const message =
                    "Transaksi sebesar " + rupiah(price) + " dibatalkan";
                  mail.notifApp(btitle, bid, pid, oid, message);
                  mail.notifApp(stitle, sid, pid, oid, message);
                  mail.sendMail(bmail, btitle, btemp, bname, pname, price);
                  mail.sendMail(semail, stitle, stemp, sname, pname, price);
                }

                if (updateArgs.status === "BERHASIL") {
                  const price = offer.offering_price;
                  const btitle = "Transaksi berhasil";
                  const stitle = "Transaksi berhasil";
                  const stemp = "succsestransaction";
                  const btemp = "transactionsuccses";
                  const message =
                    "Transaksi sebesar " + rupiah(price) + " berhasil";
                  mail.notifApp(btitle, bid, pid, oid, message);
                  mail.notifApp(stitle, sid, pid, oid, message);
                  mail.sendMail(bmail, btitle, btemp, bname, pname, price);
                  mail.sendMail(semail, stitle, stemp, sname, pname, price);
                }


                transaksiService
                  .update(tid, updateArgs)
                  .then((transactions) => {
                    res.status(200).json({
                      status: "UPDATE_TRANSACTION_SUCCESS",
                      transactions,
                    });
                  });
              });
            });
          });
        });
      });
    } catch (error) {
      res.status(422).json({
        status: "FAIL",
        message: error.message,
      });
    }
  },
};
