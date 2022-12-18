<?php

namespace Database\Factories;

use App\Models\Userprofile;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserProfile>
 */
class UserProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Userprofile::class;
    public function definition()
    {
        $jobs = array('farm Manager', 'Area Sales Manager', 'Electrician', 'Facility Day supervisor', 'General labour');
        shuffle($jobs);
        return [
            'firstname' => fake()->name(),
            'lastname' => fake()->name(),
            'contact' => fake()->numberBetween(5513213213,6513213213),
            'location' => fake()->sentence(),
            'identification_number' => Str::random(30),
            'jobposition' => $jobs[0],
            'user_id'=>rand(1,30)

        ];
    }
}
