<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    // Specify the table name if it's different from the default
    protected $table = 'educations';

    // Define the fillable fields for mass assignment
    protected $fillable = [
        'school',
        'degree',
        'year',
    ];
}
