<?php

namespace App\Controller;

use App\Form\PhotoUploadType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/photo", name="photo_")
 */
class PhotoController extends AbstractController
{
    /**
     * @Route("/upload", name="upload", methods={"POST"})
     */
    public function upload(): JsonResponse
    {
        $form = $this->createForm(PhotoUploadType::class);

        if ($form->isSubmitted() && $form->isValid()) {
            return new JsonResponse(['ok' => true], 201);
        }

        return new JsonResponse(['ok' => false, 400]);
    }
}
