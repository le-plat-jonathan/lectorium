<?php

class Order {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // création d'un ticket à la commande
    public function create($total, $user_id) {
        $sql = "INSERT INTO `order` (total, created_at, user_id) VALUES (:total, NOW(), :user_id)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':total' => $total,
            ':user_id' => $user_id
        ]);
        return ['message' => 'Order created successfully'];
    }

    // récupération de la commande par son id
    public function getById($id) {
        $sql = "SELECT * FROM `order` WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // récupération de toutes les commandes d'un utilisateur
    public function getByUserId($user_id) {
        $sql = "SELECT * FROM `order` WHERE user_id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$user_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
