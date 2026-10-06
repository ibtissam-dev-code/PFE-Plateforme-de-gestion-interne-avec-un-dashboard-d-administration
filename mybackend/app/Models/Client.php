<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Projet; // زيدي هاد السطر

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'societe',
        'email',
        'telephone',
    ];

    // العلاقة: Client عندو بزاف ديال Projets
    public function projets()
    {
        return $this->hasMany(Projet::class);
    }
}