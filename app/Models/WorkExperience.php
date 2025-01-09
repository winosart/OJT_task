<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkExperience extends Model
{
    use HasFactory;

    protected $table = 'work_experiences';


    protected $fillable = [
        'user_id', 'company', 'role', 'duration',
    ];

    // public function user()
    // {
    //     return $this->belongsTo(User::class);
    // }
}
