<?php

class Cart {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // ajout d'un item au panier
    public function add($book_id, $quantity, $user_id) {
        try {
            // Validation des entrées
            if (!is_string($book_id) || !is_numeric($quantity) || !is_numeric($user_id)) {
                throw new InvalidArgumentException('Invalid input');
            }
    
            // à l'ajout d'un item au panier, on s'assure que toutes les opérations se déroulent correctement grâce à une transaction
            $this->pdo->beginTransaction();
    
            $sql = "INSERT INTO cart (book_id, quantity, user_id, aside) VALUES (:book_id, :quantity, :user_id, 0)";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                ':book_id' => $book_id,
                ':quantity' => $quantity,
                ':user_id' => $user_id
            ]);
            // si ok -> transaction terminée
            $this->pdo->commit();
            return ['message' => 'Item added to cart successfully'];
        } catch (PDOException $e) {
            // si échec -> transaction annulée 
            $this->pdo->rollBack();
            error_log($e->getMessage());
            return ['message' => 'Failed to add item to cart'];
        } catch (InvalidArgumentException $e) {
            return ['message' => $e->getMessage()];
        }
    }
    

    // récupération du panier de l'utilisateur par son id
    public function getByUserId($user_id) {
        if (!is_numeric($user_id)) {
            throw new InvalidArgumentException('Invalid user ID');
        }

        $sql = "SELECT * FROM cart WHERE user_id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$user_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // modification de la quantité d'un item dans le panier
    public function update($id, $quantity) {
        if (!is_numeric($id) || !is_numeric($quantity)) {
            throw new InvalidArgumentException('Invalid input');
        }

        $sql = "UPDATE cart SET quantity = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$quantity, $id]);
        return ['message' => 'Cart updated successfully'];
    }

    // suppression d'un item du panier
    public function remove($id) {
        if (!is_numeric($id)) {
            throw new InvalidArgumentException('Invalid input');
        }

        $sql = "DELETE FROM cart WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return ['message' => 'Item removed from cart successfully'];
    }

    // mettre de côté un item du panier
    public function putAside($id) {
        try {
            if (!is_numeric($id)) {
                throw new InvalidArgumentException('Invalid input');
            }

            $sql = "UPDATE cart SET aside = 1 WHERE id = ?";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([$id]);
            return ['message' => 'Item put aside successfully'];
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return ['message' => 'Failed to put the item aside'];
        }
    }

    // retirer de côté un item du panier
    public function removeAside($id) {
        try {
            if (!is_numeric($id)) {
                throw new InvalidArgumentException('Invalid input');
            }

            $sql = "UPDATE cart SET aside = 0 WHERE id = ?";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([$id]);
            return ['message' => 'Item removed from aside successfully'];
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return ['message' => 'Failed to remove the item from aside'];
        }
    }
}
?>
