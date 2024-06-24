<?php

class Order {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function create($total, $user_id) {
        $sql = "INSERT INTO `order` (total, created_at, user_id) VALUES (total :total, NOW(), user_id :user_id)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$total, $user_id]);
        return ['message' => 'Order created successfully'];
    }

    public function getById($id) {
        $sql = "SELECT * FROM `order` WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function update($id, $total) {
        $sql = "UPDATE `order` SET total = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$total, $id]);
        return ['message' => 'Order updated successfully'];
    }

    public function delete($id) {
        $sql = "DELETE FROM `order` WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return ['message' => 'Order deleted successfully'];
    }
}
?>
