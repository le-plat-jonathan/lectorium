<?php

class Cart {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // ajout d'un item au panier
    public function add($book_id, $quantity, $user_id) {
        try {
            $sql = "INSERT INTO cart (book_id, quantity, user_id, aside) VALUES (:book_id, :quantity, :user_id, 0)";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                ':book_id' => $book_id,
                ':quantity' => $quantity,
                ':user_id' => $user_id
            ]);
            return ['message' => 'Item added to cart successfully'];
        } catch (PDOException $e) {
            return ['message' => 'Failed to add item to cart: ' . $e->getMessage()];
        }
    }

    // récupération du panier de l'utilisateur par son id
    public function getByUserId($user_id) {
        $sql = "SELECT * FROM cart WHERE user_id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$user_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // modification de la quantité d'un item dans le panier
    public function update($id, $quantity) {
        $sql = "UPDATE cart SET quantity = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$quantity, $id]);
        return ['message' => 'Cart updated successfully'];
    }

    // suppression d'un item du panier
    public function remove($id) {
        $sql = "DELETE FROM cart WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return ['message' => 'Item removed from cart successfully'];
    }

    // mettre de côté un item du panier
    public function putAside($id) {
        try {
            $sql = "UPDATE cart SET aside = 1 WHERE id = ?";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([$id]);
            return ['message' => 'Item put aside successfully'];
        } catch (PDOException $e) {
            return ['message' => 'Failed to put the item aside: ' . $e->getMessage()];
        }
    }

}
?>
