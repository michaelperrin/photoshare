<?php

namespace App\Form\Type;

use App\Entity\Picture;
use App\Form\DataTransformer\AlbumToHashTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PhotoUploadType extends AbstractType
{
    /**
     * @var AlbumToHashTransformer
     */
    private $transformer;

    public function __construct(AlbumToHashTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add(
                'album_hash',
                TextType::class,
                [
                    'property_path' => 'album',
                ]
            )
            ->add('author', TextType::class)
            ->add('file', FileType::class, ['mapped' => false])
        ;

        $builder->get('album_hash')->addModelTransformer($this->transformer);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Picture::class,
            'csrf_protection' => false,
        ]);
    }

    public function getBlockPrefix()
    {
        return null;
    }
}
