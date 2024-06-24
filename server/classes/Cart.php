<?php

class Cart {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function add($book_id, $quantity, $user_id) {
        $sql = "INSERT INTO cart (book_id, quantity, user_id) VALUES (book_id :book_id, quantity :quantity, user_id :user_id)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$book_id, $quantity, $user_id]);
        return ['message' => 'Item added to cart successfully'];
    }

    public function getByUserId($user_id) {
        $sql = "SELECT * FROM cart WHERE user_id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$user_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($id, $quantity) {
        $sql = "UPDATE cart SET quantity = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$quantity, $id]);
        return ['message' => 'Cart updated successfully'];
    }

    public function remove($id) {
        $sql = "DELETE FROM cart WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return ['message' => 'Item removed from cart successfully'];
    }
}
?>
