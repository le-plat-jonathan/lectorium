<?php

class Account {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function create($name, $type, $balance, $user_id) {
        $sql = "INSERT INTO account (name, type, balance, created_at, user_id) VALUES (name :name, type :type, balance :balance, NOW(), user_id :user_id)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$name, $type, $balance, $user_id]);
        return ['message' => 'Account created successfully'];
    }

    public function getById($id) {
        $sql = "SELECT * FROM account WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function update($id, $name, $type, $balance) {
        $sql = "UPDATE account SET name = ?, type = ?, balance = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$name, $type, $balance, $id]);
        return ['message' => 'Account updated successfully'];
    }

    public function delete($id) {
        $sql = "DELETE FROM account WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return ['message' => 'Account deleted successfully'];
    }
}
?>
